import { Room, Client } from "@colyseus/core";
import { MyRoomState, Player } from "./schema/MyRoomState";

export class MyRoom extends Room<MyRoomState> {
  playerEntities: { [sessionId: string]: any } = {};

  onCreate(options: any) {
    this.setState(new MyRoomState());
    console.log("ooptions0: ", options, this.playerEntities);

    this.onMessage("type", (client, message) => {
      //
      // handle "type" message
      //
    });

    // this.onMessage("0", (client, message) => {
    //   const player = this.state.players.get(client.sessionId);
    //   player.name = message.userName;
    //   player.id = message.id;
    // });
  }

  onJoin(client: Client, options: any) {
    console.log("options", options);
    console.log(client.sessionId, "joined!");
    // create Player instance
    const player = new Player();

    // place Player at a random position
    player.name = options.name;
    player.id = options.id;

    this.state.players.set(client.sessionId, player);
  }

  onLeave(client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");

    this.state.players.delete(client.sessionId);
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

}
