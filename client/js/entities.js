
var id_giver = 0;
class Entity
{
	constructor(hp, x, y, icon, name)
	{
		this.icon = icon;
		this.id = id_giver++;
		this.hp = hp;
		this.name = name;

		this.x = x;
		this.y = y;

		this.meleeDmg = 30;
	}

	move(x, y)
	{
		this.x += x;
		this.y += y;
	}

	attack(who)
	{
		who.hp -= this.meleeDmg;
		display.show(this.name + " attacked " + who.name +" [" + this.meleeDmg + " dmg]");

		if (who.hp > 0)
		{
			this.hp = who.meleeDmg;
			display.show(who.name + " fought back [" + who.meleeDmg + " dmg]");
		}
		else
		{
			//todo drop items ...
			display.show(who.name + " is dead.");
			entities.remove(who);
		}
	}
}

class Enemy extends Entity
{
	constructor(hp, x, y, icon, name)
	{
		super(hp, x, y, icon, name);

		this.state = "idle";
	}


	update()
	{
		if (this.state == "idle")
		{
			var _x, _y;
			switch(Math.floor((Math.random() * 10)) % 5)
			{
				case 0: _x = 0; _y=1; break;
				case 1: _x = -1; _y=0; break;
				case 2: _x = 0; _y=-1; break;
				case 3: _x = 1; _y=0; break;
				case 4: _x = 0; _y=0; break;
			}

			if (map.isTileFree(this.x + _x, this.y + _y))
				if (entities.getOnPos(this.x + _x, this.y + _y) == null)
					this.move(_x,_y);
		}
	}

}


class Entities extends Renderer
{
	constructor()
	{
		super();
		this.handle = [];
		this.handle.push(new Entity(100, 3, 3, "@", "Gale"));
		this.handle.push(new Enemy(100, 6, 0, "K", "Kobold"));
		this.handle.push(new Enemy(100, 5, 10, "K", "Kobold"));
	}


	getOnPos(x, y)
	{
		for (var i = 0, len = this.handle.length; i < len; i++)
			if ( this.handle[i].x == x && this.handle[i].y == y )
				return this.handle[i];

		return null;
	}

	getPlayer()
	{
		return this.handle[0];
	}

	remove(ent)
	{
		for(var i = this.handle.length - 1; i >= 0; i--)
            if(this.handle[i].id === ent.id)
                this.handle.splice(i, 1);
	}

	update()
	{
		for (var i = 1, len = this.handle.length; i < len; i++)
			this.handle[i].update();
	}

	render()
	{
		for (var i = 0, len = this.handle.length; i < len; i++)
		{
			this._clear(this.handle[i].x, this.handle[i].y);
			this._draw(this.handle[i].icon, this.handle[i].x, this.handle[i].y );
		}
	}

}
