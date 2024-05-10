import axios from 'axios'
import json from './data.json'
export const getRobotCar = () => {
    return json[0]
}

export const getArmsRobot = () => {
    return json[1]
}

export const getArmsRobot2 = () => {
    return json[2]
}

export const getArms = () => {
    return json[3]
}

export const getArmsShelf = () => {
    return json[4]
}