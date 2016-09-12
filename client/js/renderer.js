

// managers have to override this class. Dont use directly
class Renderer
{
	constructor()
	{
		this.tileSize = 32;

		this.canvas = document.getElementById('main');
		this.ctx = this.canvas.getContext('2d');

		this.ctx.font = "32px Arial";
		this.ctx.fillStyle = "#000000";
		this.ctx.textAlign="center";
	}

	_draw(what , x , y)
	{
		this.ctx.fillText(what, x * this.tileSize + this.tileSize,  y * this.tileSize + this.tileSize);
	}

	_clear(x, y)
	{
		// coord + offset - text Centered (size / 2)
		this.ctx.clearRect(x * this.tileSize + this.tileSize - ( this.tileSize * 0.5 ),  y * this.tileSize + this.tileSize - ( this.tileSize * 0.5 ), this.tileSize, this.tileSize);
	}

	clearScreen()
	{
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

}
