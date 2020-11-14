import React, { useState, useEffect } from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faChevronRight,
	faChevronLeft,
	faCircle,
	faCheckCircle,
	faPlus,
} from "@fortawesome/free-solid-svg-icons";

const App = () => {
	//itemのuseStateを作る
	//初期状態は空のオブジェクトでOK
	const [items, setItems] = useState([]);

	//入力値のuseState作る
	const [inputValue, setInputValue] = useState('');

	//クリック時にitems配列に新しいitemを作る処理
	const handleAddButtonClick = () => {

		//作られるitemの定義
		const newItem = {
			itemName: inputValue,
			quantity: 1,
			isSelected: false,
		};

		//items配列にpushされる
		const newItems = [...items, newItem];

		//useStateのitemsに反映
		setItems(newItems);

		//入力値を空に
		setInputValue('');
	};

	//done切り替え
	const toggleComplete = (index) => {
		//itemsを展開した配列、newItemsを作る
		const newItems = [...items];
		//引数にindexから、該当するitemのisSelectedを切り替える
		newItems[index].isSelected = !newItems[index].isSelected;
	
		setItems(newItems);
	};

	return (
		<div className="app-background">
			<div className="main-container">
				<div className="add-item-box">
				{/* inputValueにクリック時の入力値を与える */}
				<input value={inputValue} onChange={(event) => setInputValue(event.target.value)} className='add-item-input' placeholder='Add an item...' />
					{/* プラスアイコンでhandleAddButtonClickを発火 */}
					<FontAwesomeIcon icon={faPlus} onClick={() => handleAddButtonClick()}/>
				</div>
				<div className="item-list">
					{/* mapを使ってitems配列をitemのループで出力する */}
					{/* indexを設定する事で、クリックイベント時にそのアイテムがどれか判断できる */}
					{items.map((item, index) => (
						<div className="item-container">
							{/* toggleCompleteにindexを渡す事で、そのitemのisSelected切り替える。 */}
							<div className="item-name" onClick={() => toggleComplete(index)}>
								{/* 条件分岐、trueなら上、falseなら下を表示 */}
								{item.isSelected ? (
									<>
										<FontAwesomeIcon icon={faCheckCircle} />
										<span className="completed">{item.itemName}</span>
									</>
								) : (
									<>
										<FontAwesomeIcon icon={faCircle} />
										<span>{item.itemName}</span>
									</>
								)}
							</div>
							<div className="quantity">
								<button>
									<FontAwesomeIcon icon={faChevronLeft} />
								</button>
								<span> {item.quantity} </span>
								<button>
									<FontAwesomeIcon icon={faChevronRight} />
								</button>
							</div>
						</div>
					))}
				</div>
				<div className="total">Total: </div>
			</div>
		</div>
	);
};

export default App;
