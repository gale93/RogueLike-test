
class TextDisplay
{
	constructor()
	{
		this.last_msg = "";

		for (var i = 0; i < 5; i++)
		{
			var node = document.createElement("p");
			var textnode = document.createTextNode("");
			node.appendChild(textnode);

			document.getElementById("text_display").insertBefore(node,document.getElementById("text_display").firstChild);
		}

		this.show("Welcome to RogueLike Test...");
	}

	_setTextOn(i, txt)
	{
		document.getElementById("text_display").getElementsByTagName("p")[i].innerHTML = txt;
	}

	_getTextOn(i)
	{
		return document.getElementById("text_display").getElementsByTagName("p")[i].innerHTML;
	}


	show(msg)
	{
		if (this.last_msg == msg)
			return;
		this.last_msg = msg;

		for (var i = 4 ; i >= 0 ; i--)
		{
			if (i == 0)
				this._setTextOn(0, msg);
			else
				this._setTextOn(i, this._getTextOn(i-1));
		}
	}
}
