import json from './data.json'
export const getRobotCar = () => {
    return json[0][0]
}

export const getArmsRobot = () => {
    return json[0][1]
}

export const getArmsRobot2 = () => {
    return json[0][2]
}