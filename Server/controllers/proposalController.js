import ExpertModel from "../Models/ExpertModel.js"
import ProposalModel from "../Models/ProposalModel.js"
import UserModel from "../Models/UserModel.js"


import { notifyUserAndExpertGroupOfAddProposal, notifyUserOfStatusChange } from "./SenderMessageToMail.js"

import {createProposalNumber, writeLastProposalNumber, clearLastProposalNumber} from "../proposalNumberController.js"
import config  from "config"

class ProposalController {
    async add(req, res) {
        try {
            const user = await UserModel.findById(req.userId).exec()
            if (!user) {
                return res.status(403).json({
                    message: "Нет доступа"
                })
            }
            
            const proposalNumber =  createProposalNumber()
            const {title, description} = req.body
            const NotConsidered = 0;
            const proposal = await ProposalModel.create({
                number: proposalNumber, 
                title, description, 
                userId: user._id,
                status: NotConsidered
            })
            
            writeLastProposalNumber(proposalNumber)
            notifyUserAndExpertGroupOfAddProposal(user.email, proposal)
           
            return res.json({
                proposalID: proposal._id,
                proposalNumber
            })
        } catch(err){
            console.log(err)
            res.status(500).json({
                message: 'Что-то пошло не так, попробуйте позже...'
            })
        }
    }
    
    async removeAll(req, res) {
        try {
            await ProposalModel.deleteMany()
            clearLastProposalNumber()
            res.json({
                message: 'Все заявки удалены'
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: 'Что-то пошло не так, попробуйте позже...'
            })
        }
    }
    async getAllProposalsInFile(req, res) {
        try {
            const proposals = await ProposalModel.find({})
            const filePath = await toEcxelFile(proposals)
            
            res.download(filePath)
        } catch (err) {
            console.log(err)
            res.status(500).json({message: 'Что-то пошло не так, попробуйте позже...'})
        }
    }

    //Вспомогательная для понимания что находиться внутри БД
    async getAll(req, res) {
        try {
            const proposals = await ProposalModel.find({})
            return res.json({
                proposals
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({message: 'Что-то пошло не так, попробуйте позже...'})
        }
    }

    async getNextAccepted(req, res) {
        try {
            const {numberSkipped, numberProposals} = req.body
            const Accepted = config.get("status.Accepted")

            const acceptedProposals = await getCertainProposals({status: Accepted}, numberSkipped, numberProposals)
            return res.json({
                acceptedProposals
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({message: 'Что-то пошло не так, попробуйте позже...'})
        }
    }

    async getNextNotConsidered(req, res) {
        try {
            const {numberSkipped, numberProposals} = req.body
            const NotConsidered = config.get("status.NotConsidered")
            
            const notConsideredProposals = await getCertainProposals({status: NotConsidered}, numberSkipped, numberProposals)
            return res.json({
                notConsideredProposals
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({message: 'Что-то пошло не так, попробуйте позже...'})
        }
    }

    //  User  /////////////////////////////
    async userGetAll(req, res) {
        try {
            const proposals = await ProposalModel.find({userId: req.userId})
            return res.json({
                proposals
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({message: 'Что-то пошло не так, попробуйте позже...'})
        }
    }

    async userGetNextAccepted(req, res) {
        try {
            const {numberSkipped, numberProposals} = req.body
            const Accepted = config.get("status.Accepted")
            const options = {
                userId: req.userId,
                status: Accepted
            }

            const acceptedProposals = await getCertainProposals(options, numberSkipped, numberProposals)
            return res.json({
                acceptedProposals
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({message: 'Что-то пошло не так, попробуйте позже...'})
        }
    }

    async userGetNextNotConsidered(req, res) {
        try {
            const {numberSkipped, numberProposals} = req.body
            const NotConsidered = config.get("status.NotConsidered")
            const options = {
                userId: req.userId,
                status: NotConsidered
            }
            
            const notConsideredProposals = await getCertainProposals(options, numberSkipped, numberProposals)
            return res.json({
                notConsideredProposals
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({message: 'Что-то пошло не так, попробуйте позже...'})
        }
    }

    async userGetNextRejected(req, res) {
        try {
            const {numberSkipped, numberProposals} = req.body
            const Rejected = config.get("status.Rejected")
            const options = {
                userId: req.userId,
                status: Rejected
            }
            
            const rejectedProposals = await getCertainProposals(options, numberSkipped, numberProposals)
            return res.json({
                rejectedProposals
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({message: 'Что-то пошло не так, попробуйте позже...'})
        }
    }

    async updateStatus(req, res) {
        try {
            const expert = await ExpertModel.findById(req.userId)
            if (!expert) {
                return res.status(403).json({
                    message: "Нет доступа!"
                })
            }

            const {status} = req.body
            if (!(status === -1 || status == 1)) {
                return res.status(400).json({
                    message: "Изменить статус можно только на -1 или на 1!"
                })
            }

            const idProposal = req.params.id
            const proposal = await ProposalModel.findByIdAndUpdate(idProposal, {status}, {new: true})
            if (!proposal) {
                return res.status(404).json({
                    message: "Заявка не найдена!"
                })
            }

            const user = await UserModel.findById(proposal.userId)
            if (!user) {
                return res.status(200).json({
                    success: true,
                    proposalStatus: proposal.status,
                    message: "Пользователь данной заявки не найден!"
                })
            }
            
            notifyUserOfStatusChange(proposal, user.email);

            return res.json({
                success: true,
                proposalStatus: proposal.status
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({message: 'Что-то пошло не так, попробуйте позже...'})
        }
    }

    async likeProposal(req, res) {
        try {
            const proposalId = req.params.id;
            const userId = req.userId;
            let proposal = await ProposalModel.findById(proposalId);
            const candidate = proposal.likes.find(like => like.toString() === userId);

            if (candidate) {
                await ProposalModel.findByIdAndUpdate(proposalId, {$pull: {likes: userId}});
            } else {
                await ProposalModel.findByIdAndUpdate(proposalId, {$push: {likes: userId}});
            }

            console.log(proposal);
            res.json({
                message: proposal.likes
            })
        } catch (e) {
            console.log(e);
            res.status(500).json({message: "Что-то пошло не так, попробуйте позже..."});
        }
    }
}

//options: {[userId: req.userId], status: status}
const getCertainProposals = async (options, numberSkipped, numberProposals) => {
    const query = ProposalModel.find(options)//{[userId: req.userId], status: status})
                                .sort("_id")
                                .skip(numberSkipped)
                                .limit(numberProposals)
    const proposals = await query.exec()
    return proposals
}

export default new ProposalController()