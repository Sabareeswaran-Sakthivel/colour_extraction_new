import cv2
from ultralytics import YOLO
from PIL import Image
import sys
import os

model = YOLO('./best (3).pt')

# test_img = "./test/t-shirt.jpg"
test_img = "./test/" + sys.argv[2]
results = model(test_img)
boxes = results[0].boxes
det = boxes.xyxy
flag = False


img = cv2.imread(test_img)
if len(det) != 0:
    flag = True
    for x in det:
        # Parse the bounding box information from YOLO output
        bbox = x.cpu().numpy()  # Example bounding box coordinates
        bbox = [int(i) for i in list(bbox)]
        # print(bbox)

        # Load the image into memory

        # Draw the rectangle on the image
        color = (0, 255, 0)  # Green color
        thickness = 2
        pt1 = (bbox[0], bbox[1])
        pt2 = (bbox[2], bbox[3])
        cv2.rectangle(img, pt1, pt2, color, thickness)

    # Display the image with the rectangle
    # cv2.imshow("img", img)
    # cv2.waitKey(0)
    # cv2.destroyAllWindows()
    # det_path = "./det/" + str(test_img.split('/')[-1])
    det_path = "./det/output.png";
    cv2.imwrite(det_path, img)

    image_ext = Image.open(test_img)
    object_image = image_ext.crop((bbox[0], bbox[1], bbox[2], bbox[3]))

    # save_path = "./output/" + str(test_img.split('/')[-1])
    save_path = './output/output.png'
    object_image.save(save_path, 'PNG')
    print('object detected')


else:
    flag=False
    print('none. detected')