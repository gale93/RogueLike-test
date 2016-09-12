/*	map.js */

class Tile
{
	constructor(type)
	{
		this.type = type;

		this.items = [];
	}

	isFree()
	{
		return TileType[this.type]["block"] == 0;
	}

}


class TileMap extends Renderer
{
	constructor()
	{
		super();

		this.WIDTH = 0;
		this.HEIGHT = 0;
		this.handle = [];

		this.loadMap("room");
	}

	loadMap(which)
	{
		var _map = JSONRequest("maps.get?&room=" + which);

		this.WIDTH 	= _map["width"];
		this.HEIGHT = _map["height"];
		delete this.handle;
		this.handle = [];

	    for(var i=0; i < this.WIDTH; i++)
		{
			this.handle.push([]);
			this.handle[i].push(new Array(this.HEIGHT));

			for(var j=0; j < this.HEIGHT; j++)
				this.handle[i][j] = new Tile(".");
	    }

		var idata = 0;
		for (var y = 0; y < this.HEIGHT; y++)
			for (var x = 0; x < this.WIDTH; x++)
				this.handle[x][y].type = _map["data"][idata++];
	}

	render()
	{
		for (var x = 0; x < this.WIDTH; x++)
			for (var y = 0; y < this.HEIGHT; y++)
			{
				if (this.handle[x][y].items.length > 0)
					this._draw("L", x, y);
				else
					this._draw(this.handle[x][y].type, x, y);
			}
	}

	isTileFree(x, y)
	{
		if (x >= map.WIDTH || y >= map.HEIGHT || x < 0 || y < 0)
			return false;

		return this.handle[x][y].isFree();
	}

}

function JSONRequest(req)
{
	var request = new XMLHttpRequest();
	request.open("GET", req, false);
	request.send(null);

	return JSON.parse(request.responseText);
}
