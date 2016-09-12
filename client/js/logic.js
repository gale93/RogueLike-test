class Logic
{
	constructor()
	{
		this.nextX = 0;
		this.nextY = 0;

		this.elaborating_commands = "";
	}

	processInput(e)
	{
		this.nextX = 0;
		this.nextY = 0;

		if (e.code == "ArrowUp")
			this.nextY = -1;
		else if (e.code == "ArrowDown")
			this.nextY = 1;
		if (e.code == "ArrowLeft")
			this.nextX = -1;
		else if (e.code == "ArrowRight")
			this.nextX = 1;

		if (this.elaborating_commands == "")
		{
			this._processCommands(e.code, false);

			if (this.elaborating_commands != "")
				return;
		}
		else
			return this._processCommands(this.elaborating_commands, true);


		var player = entities.getPlayer();
		var _x = player.x + this.nextX, _y = player.y + this.nextY;

		if (_x >= map.WIDTH ||
			_y >= map.HEIGHT ||
			_x < 0 ||
			_y < 0)
			display.show("Cannot go further... Map is finished.");
		else
		{
			if(map.isTileFree(_x,_y))
			{
				var ent = entities.getOnPos(_x,_y);
				if (ent != null)
					player.attack(ent);
				else
					player.move(this.nextX, this.nextY);
			}
			else
				display.show(TileType[map.handle[_x][_y].type]["block_phrase"]);

		}

		entities.update();
	}

	_processCommands(code, action)
	{
		switch (code)
		{
			case "KeyO":
			{
				if (!action)
					display.show("Which direction you want open the door?");
				else
				{
					var player = entities.getPlayer();
					var _x = player.x + this.nextX, _y = player.y + this.nextY;

					if (TileType[map.handle[_x][_y].type]["name"] != "CLOSED_DOOR")
						display.show("That's obviously not a door ...");
					else
					{
						map.handle[_x][_y].type = "/";
						display.show("You open the door");
					}
				}

				break;
			}

			default:	return;
		}


		this.elaborating_commands = action ? "" : code;
	}


}
