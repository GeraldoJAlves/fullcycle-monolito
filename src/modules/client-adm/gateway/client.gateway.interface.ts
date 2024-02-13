import { Id } from "@/modules/@shared/domain/value-object";
import { Client } from "@/modules/client-adm/domain";

export default interface ClientGatewayInterface {
  add(client: Client): Promise<void>;
  find(id: Id): Promise<Client>;
}
