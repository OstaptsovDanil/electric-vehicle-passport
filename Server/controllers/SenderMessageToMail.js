import ExpertModel from "../Models/ExpertModel.js"
import nodemailer from 'nodemailer'
import config from "config"

const transporterData = config.get("transporterData")
const transporter = nodemailer.createTransport({
    service: transporterData.service,
    auth: {
        user: transporterData.companyEmail,
        pass: transporterData.pass
  }
})

const notifyUserAndExpertGroupOfAddProposal = async (userEmail, proposal) => {
    send(userEmail, 'Статус заявки ' + proposal._id, 'Ваша заявка добавлена на рассмотрение экспертам. Номер вашей заявки ' + proposal._id)
    await sendToExpertGroup('Новая заявка ' + proposal._id, 'Добавлена новая заявка. Номер заявки ' + proposal._id)
}

const notifyUserOfStatusChange = (proposal, userEmail) => {
    const subject = "Статус заявки"

    let message;
    if (proposal.status === 1) {
        message = "Ваша заяка принята."
    } else if (proposal.status === -1) {
        message = "Ваша заяка отклонена."
    }
    else {
        throw 'У заявки должен быть статус либо "принято", либо "отклонено"!'
    }
    message += " Название идеи " + proposal.title + "."
    message += " Номер заявки " + proposal.number

    send(userEmail, subject, message)
}

const sendToExpertGroup = async (subject, message) => {
    const experts = await ExpertModel.find({})

    for (let i = 0; i < experts.length; i++) {
        send(experts[i].email, subject, message)
    }
}

const send = (toEmail, subject, message) => {
    const mailOptions = {
        from: transporterData.companyEmail,
        to: toEmail,
        subject: subject,
        text: message
    }
      
    // transporter.sendMail(mailOptions, (err, info) => {
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         console.log('Email sent: ' + info.response)
    //     }
    // })
}

export  {notifyUserAndExpertGroupOfAddProposal, notifyUserOfStatusChange}