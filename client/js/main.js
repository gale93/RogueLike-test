
function startUp()
{
	TileType = JSONRequest("js/tiles_def.json");

	map = new TileMap();
	map.loadMap("room");

	display = new TextDisplay();
	entities = new Entities();
	logic = new Logic();


	render();
}



function loop(e)
{
	logic.processInput(e);

	render();
}

function render()
{
	map.clearScreen();
	map.render();
	entities.render();
}
