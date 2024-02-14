"use client";

import { useEffect, useState } from "react";

const GRID_SIZE = 20;

type Point = {
	x: number;
	y: number;
};

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

export default function SnakeGrid() {
	const [snake, setSnake] = useState<Point[]>([
		{ y: 0, x: 2 },
		{ y: 0, x: 1 },
		{ y: 0, x: 0 },
	]);
	const [food, setFood] = useState<Point>({ x: 0, y: 0 });
	const [direction, setDirection] = useState<Direction>("RIGHT");
	const [gameOver, setGameOver] = useState<boolean>(false);
	const [count, setCount] = useState(0);

	const generateFood = () => {
		const x = Math.floor(Math.random() * GRID_SIZE);
		const y = Math.floor(Math.random() * GRID_SIZE);
		setFood({ x, y });
	};

	const moveSnake = () => {
		const newSnake = [...snake];
		const snakeHead = { ...newSnake[0] };

		if (direction === "UP") {
			snakeHead.y -= 1;
		}
		if (direction === "DOWN") {
			snakeHead.y += 1;
		}
		if (direction === "LEFT") {
			snakeHead.x -= 1;
		}
		if (direction === "RIGHT") {
			snakeHead.x += 1;
		}

		if (
			snakeHead.x < 0 ||
			snakeHead.x >= GRID_SIZE ||
			snakeHead.y < 0 ||
			snakeHead.y >= GRID_SIZE ||
			newSnake.some(
				(snakePart) => snakePart.x === snakeHead.x && snakePart.y === snakeHead.y
			)
		) {
			setGameOver(true);
			return;
		}

		newSnake.unshift(snakeHead);

		if (snakeHead.x === food.x && snakeHead.y === food.y) {
			generateFood();
			setCount((prevCount) => prevCount + 6);
		} else {
			newSnake.pop();
		}

		setSnake(newSnake);
	};

	useEffect(() => {
		const interval = setInterval(moveSnake, 120);
		return () => clearInterval(interval);
	}, [snake, direction]);

	useEffect(() => {
		generateFood();
	}, []);

	const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
		if (gameOver) {
			restartGame();
			return;
		}

		if (event.key === "ArrowUp" && direction !== "DOWN") {
			setDirection("UP");
		} else if (event.key === "ArrowDown" && direction !== "UP") {
			setDirection("DOWN");
		} else if (event.key === "ArrowLeft" && direction !== "RIGHT") {
			setDirection("LEFT");
		} else if (event.key === "ArrowRight" && direction !== "LEFT") {
			setDirection("RIGHT");
		}
	};

	const restartGame = () => {
		setGameOver(false); // Reset gameOver state to false
		generateFood();
		setCount(0);
		setDirection("RIGHT");
		setSnake([
			{ y: 0, x: 2 },
			{ y: 0, x: 1 },
			{ y: 0, x: 0 },
		]);
	};

	return (
		<>
			{!gameOver && (
				<p className="border-2 border-purple-800 p-2 border-dashed bg-teal-400 font-bold">
					Score: {count}
				</p>
			)}
			{gameOver && (
				<h2 className="border-2 border-purple-800 p-2 border-dashed bg-teal-400 font-bold">
					Total Score : {count}
				</h2>
			)}

			<div
				onKeyDown={handleKeyPress}
				tabIndex={0}
				autoFocus
				className="bg-slate-800 grid grid-cols-20 grid-rows-20 border border-black"
			>
				<button
					onClick={restartGame}
					className={`text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 cursor-pointer focus:ring-blue-300 font-medium text-lg text-bold px-5 py-3 text-center me-0 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${gameOver && "opacity-50 pointer-events-none"}`}
				>
					Restart
				</button>
				{gameOver && (
					<div className="absolute inset-0 flex justify-center items-center text-1xl font-bold text-red-500">
						Game Over! Press Enter to start a new game.
					</div>
				)}
				
				{Array.from({ length: GRID_SIZE }).map((_, y) => (
					<div className="flex" key={y}>
						{Array.from({ length: GRID_SIZE }).map((_, x) => (
							<div
								key={x}
								className={`w-5 h-5 border-hidden border-gray-100
							 ${
									snake.some(
										(snakePart) => snakePart.x === x && snakePart.y === y
									) && "bg-green-500"
								}

							 ${food.x === x && food.y === y && "bg-red-500"}`}
							></div>
						))}
					</div>
				))}
			</div>
		</>
	);
}
