import { v4 } from "uuid"
import { IIdGenerator } from "../business/Ports"

export class IdGenerator implements IIdGenerator {
    generateId = (): string => {
        return v4()
    }
}

export default new IdGenerator()