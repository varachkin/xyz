const unitElement = document.getElementById("unit")
const canvasElement = document.getElementById("canvas")
const moveToButton = document.getElementById('move-to')
const xPosInput = document.getElementById('x-pos')
const yPosInput = document.getElementById('y-pos')
const speedInput = document.getElementById('speed')


class Unit {

	constructor(unit) {
		this._unit = unit
		this._path = []
		this.currentPos = {x: 0, y: 0}
	}

	moveTo(endPosX, endPosY, duration, draw) {
		for (let i = 1; i <= 100; i++) {
			const stepY = Math.abs(endPosY - this.currentPos.y) / 100 * i;
			const stepX = Math.abs(endPosX - this.currentPos.x) / 100 * i;
			this._path.push({
				x: endPosX <= this.currentPos.x ? this.currentPos.x - stepX : this.currentPos.x + stepX,
				y: endPosY <= this.currentPos.y ? this.currentPos.y - stepY : this.currentPos.y + stepY,
				speed: duration / 100,
				draw
			})
		}
		return this.go(this._path.length - 100)
	}


	async go(pos) {
		for (const path of this._path.slice(pos, pos + 100)) {
			const result = await new Promise(res => {
				setTimeout(() => res(path), path.speed)
			})
			this.move(result)
		}
		return this
	}

	move({x, y, speed, draw}) {
		this.currentPos = {x, y}
		this._unit.style.transform = `translateX(${x}px) translateY(${y}px)`
		this._unit.style.transition = `transform ${speed}ms linear`
		if(draw) {
			const pathLine = document.createElement('div');
			pathLine.style.width = '1px';
			pathLine.style.height = '1px';
			pathLine.style.border = '12px solid blue';
			pathLine.style.borderRadius = '50%';
			pathLine.style.position = 'absolute';
			pathLine.style.left = `${x + 5}px`;
			pathLine.style.top = `${y + 5}px`;
			canvasElement.appendChild(pathLine)
		}


	}

	sayPath() {
		console.log(this._path)
	}
}

const unit = new Unit(unitElement)

unit.moveTo(400, 600, 10, true)
	.then(u => u.moveTo(0, 600, 10, false)
		.then(u => u.moveTo(400, 0, 10, true))
		.then(u => u.moveTo(1000, 0, 10))
		.then(u => u.moveTo(600, 600, 10, true))
		.then(u => u.moveTo(600, 0, 10, false))
		.then(u => u.moveTo(800, 300, 10, true))
		.then(u => u.moveTo(1200, 0, 10, false))
		.then(u => u.moveTo(1200, 600, 10, true))
		.then(u => u.moveTo(1600, 0, 10, true))
		.then(u => u.moveTo(1600, 600, 10, true))
		.then(u => u.moveTo(1800, 600, 10, false))
		.then(u => u.moveTo(1800, 540, 10, true))
		.then(u => u.moveTo(1800, 500, 10, false))
		.then(u => u.moveTo(1800, 0, 10, true))
		.then(u => u.moveTo(0, 700, 10, false))
		.then(u => u.moveTo(1800, 700, 10, true))

	)

moveToButton.addEventListener('click', () => unit.moveTo(xPosInput.value, yPosInput.value, speedInput.value))

