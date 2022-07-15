// importing react library to use react logic such as jsx and useState
import React, { useState, useEffect } from "react";

// function that will contain everything needed to let the todo list run
export const UserInput = () => {
	// state that will contain the first input where you initially enter a todo item
	// before pressing enter
	// listItem starting value (empty string)
	// setListItem allows the input value to be passed to new array and clear the
	// first input after pressing enter
	const [listItem, setListItem] = useState({
		label: "",
		done: false,
	});
	// todoList is an empty array created to put a new todo item's string inside
	// setTodoList will be used to update the empty array to the new string value AND
	//  clear the array when x div is clicked
	const [todoList, setTodoList] = useState([]);

	const userURL =
		"https://assets.breatheco.de/apis/fake/todos/user/alexAyala";

	const getAllTodos = () => {
		fetch(userURL)
			.then((response) => {
				if (!response.ok) {
					throw new Error(
						`${response.status} - ${response.statusText}`
					);
				}
				return response.json();
			})
			.then((data) => {
				console.log(data);
				setTodoList(data);
			})
			.catch((err) => console.error(err));
	};

	const remove = (index) => {
		let removeItem = todoList.filter((item, i) => i != index);
		setTodoList(removeItem);
		// if(removeItem.length) fetch(userURL),
		updateAPI(removeItem);
	};

	function updateAPI(newList) {
		fetch(userURL, {
			method: "PUT",
			headers: { "content-type": "application/json" },
			body: JSON.stringify(newList),
		}).then((resp) => {
			console.log(resp.ok); // will be true if the response is successfull
			console.log(resp.status); // the status code = 200 or code = 400 etc.
			console.log(resp.text()); // will try return the exact result as string
			return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
		});
	}

	// this is a function to spark an event when enter is pressed
	const handleKeyPress = (event) => {
		if (event.keyCode === 13) {
			//todoList is an empty array. listItem is the value of what we type in
			// initial input thanks to line __
			const newTodoList = [...todoList, listItem];
			// newTodoItem would look like [[],"initial string"]
			// BUT since we used spread operator (...) it gets rid of the array inside array and
			// give us: ["initial string"] just the array with string inside.
			setTodoList(newTodoList);
			// next the todoList is reset as this array. the value of the initial input is
			setListItem({
				label: "",
				done: false,
			});
			// set to empty string to clear initial input
			updateAPI(newTodoList);
		}
	};

	useEffect(() => {
		getAllTodos();
	}, []);

	// todoList is an array that looks like ["first item to do", "second item to do", "third item to do"]
	// we are mapping this array called todoList so we can maniupulate it to make it more like:
	// ["first item to do"] ["second item to do"] ["third item to do"]
	// then we will render the value of each array, which will become the new todo items on the userinterface
	const todo = todoList.map((item, index) => {
		console.log("item", item);
		console.log("index", index);
		console.log("todoList", todoList);
		return (
			// the item is the string item of the array called todoList such as: ["first thing"] (first thing =item)
			// looks like key={index} allows you to choose a different item in array
			// array is set up like: ["this is index 1", "this is index 2"]
			<li className="list-group-item item" key={index}>
				{item.label}

				<div
					className="mouseOver"
					onClick={() => {
						remove(index);
						// updateAPI();
					}}>
					x
				</div>
			</li>
		);
	});

	return (
		<div>
			<div>
				<input
					type="text"
					className="item userInput"
					onKeyDown={handleKeyPress}
					value={listItem.label}
					onChange={(e) =>
						setListItem({ ...listItem, label: e.target.value })
					}
					placeholder="What needs to be done?"
				/>
			</div>
			<div>
				<ul>{todo}</ul>
			</div>
			<div> {todo.length} items left</div>
		</div>
	);
};