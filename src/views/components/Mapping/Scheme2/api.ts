import json from './data.json'
export const getRobotCar = () => {
    return json[0][0]
}

export const getClamp = () => {
    return json[0][1]
}

export const getArmsShelf = () => {
    return json[0][2]
}