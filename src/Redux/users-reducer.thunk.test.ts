import { UsersAPI } from '../api/users-api'
import { follow } from './users-reducer'
import {APIResponseType, ResultCodesEnum} from '../api/api'

jest.mock('../api/users-api')
const UserAPIMock = UsersAPI

const result: APIResponseType = {
    resultCode: ResultCodesEnum.Success,
    message:[]
    data: {}
}

UserAPIMock.follow.mockReturnValue()

test('should first', async () => { 
    const Thunk = follow(1)
    const dispatchMock = jest.fn();

    await thunk(dispatchMock)

    expect(dispatchMock).toBeCalledTimes(3)
})