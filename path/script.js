function getPath(currentNode) {
	let chunks = [];
	// бежим до конечного родителя
	while (currentNode.parentNode !== null) {
		let nodeName = currentNode.nodeName.toLowerCase();
		// поищем соседей, есть ли они рядом
		let neighbors = currentNode.parentNode.childNodes;
		let childCounts = 0, currentNodeInd = 0;
		for (let i = 0, c = neighbors.length; i < c; i++ ) {
			let currentNeighbor = neighbors[i];
			// если соседи - одноименные теги, то начинаем считать их счетчик
			if (currentNeighbor.nodeName === currentNode.nodeName) {
				// когда среди всех соседей нашли себя, запоминаем свой индекс
				if (currentNeighbor === currentNode) {
					currentNodeInd = childCounts;
				}
				childCounts++;
			}
		}
		// теперь формируем строковый текущий чанк, добавляем в начало стека
		// предполагаем, что ид уникальны, но в случае не уникальности, можно это убрать
		if (currentNode.hasAttribute('id') && currentNode.id !== '') {
			chunks.unshift(currentNode.nodeName.toLowerCase() + '#' + currentNode.id);
		// иначе берем текущую ноду с соответствующим счетчиком среди соседей
		} else if (childCounts > 1) {
			chunks.unshift(nodeName + ':nth-of-type(' + (currentNodeInd + 1) + ')');
		// в ином случае просто имя ноды
		} else {
			chunks.unshift(nodeName);
		}
		// берем следующего родителя и начинаем сначала
		currentNode = currentNode.parentNode;
	}
	// возвращаем мы строку
	return chunks.join(' > ');
}
