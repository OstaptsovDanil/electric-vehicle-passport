import sys
import numpy as np
import cv2 as cv
from PIL import Image
from PIL import ImageEnhance

path_to_img = sys.argv[1]#'D:\\Programming\\ElectrocarIdentification\\Server\\Storage\\images\\ap.jpg'
img = cv.imread(path_to_img)

def changeSize(img, scale_percent=200):
    width = int(img.shape[1] * scale_percent / 100)
    height = int(img.shape[0] * scale_percent / 100) # dsize
    dsize = (width, height) 
    # resize image 
    img = cv.resize(img, dsize)

changeSize(img, 200)

first_img = img.copy()

pil_image_1 = Image.fromarray(img)
img = ImageEnhance.Contrast(pil_image_1).enhance(1.6)

img = np.array(img)

gray = cv.cvtColor(img,cv.COLOR_BGR2GRAY)
#blurred = cv.GaussianBlur(gray, (7, 7), 0)
thresh = cv.threshold(gray, 150, 255, cv.THRESH_BINARY)[1]

img = gray

#filename = 'D:\\Programming\\ElectrocarIdentification\\Server\\Storage\\images\\ap.jpg'
cv.imwrite(path_to_img, img)
print(path_to_img)
#filename = 'D:\\Programming\\ElectrocarIdentification\\Server\\Storage\\images\\show.jpg'
#cv.imwrite(filename, img)
