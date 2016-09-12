package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)


type Room struct {
	Height int      `json:"height"`
	Width  int      `json:"width"`
	Data   []string `json:"data"`
}

func (r *Room) loadFromFile(name string) {
	dat, err := ioutil.ReadFile("maps/" + name + ".txt")
	if err != nil {
		fmt.Println(err)
		return
	}

	strdata := string(dat)
	for _, elem := range strdata {
		if string(elem) != "\n" && string(elem) != "\r" {
			r.Data = append(r.Data, string(elem))
		}
	}
}

func handler(w http.ResponseWriter, r *http.Request) {

	room := &Room{Width: 24, Height: 18}

	room.loadFromFile("room")

	b, err := json.Marshal(room)
	if err != nil {
		fmt.Println(err)
		return
	}

	fmt.Fprintf(w, "%s", string(b))
}

func main() {
	http.Handle("/", http.FileServer(http.Dir("../client")))
	http.HandleFunc("/maps.get", handler)
	// http.Handle("/socket", websocket.Handler(connection.WebSocketConnection))

	http.ListenAndServe(":9000", nil)
}
