
export const updateObjectInArray = (items, objPropName, itemId, newPropName) => {
    return items.map(u => {
        if (u[objPropName] === itemId) {
            return {...u, ...newPropName}
        }
        return u;
    })
}