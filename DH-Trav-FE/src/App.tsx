import { useEffect, useState } from 'react'
import ducky from './assets/ducky.png'
import Header from './components/Header'
import './App.css'
import type { Duck } from './models/Duck'
import AddEditModal from './components/EditAddModal'
import TextButton from './components/TextButton'
import DeleteModal from './components/DeleteModal'
import { useDucksContext } from './services/DucksService'

const ModalState = {
  Add: 'add',
  Edit: 'edit',
  Delete: 'delete',
} as const;
type ModalStateType = (typeof ModalState)[keyof typeof ModalState];


function App() {
  const { ducks, getDucks } = useDucksContext()
  const [selectedDuck, setSelectedDuck] = useState<Duck | null>(null)
  const [modalState, setModalState] = useState<ModalStateType | null>(null);

  useEffect(() => {
    getDucks();
  }, []);

  const closeModal = () => {
    setModalState(null)
    setSelectedDuck(null)
  }

  return (
    <div className='warehouse'>
      {(modalState === ModalState.Add || modalState === ModalState.Edit) && <AddEditModal selectedDuck={selectedDuck} onClose={closeModal} />}
      {(modalState === ModalState.Delete && selectedDuck) && <DeleteModal selectedDuck={selectedDuck} onClose={closeModal} />}
      <Header />
      <div className='title'>
        <h2>Warehouse Management</h2>
        <img src={ducky} alt='ducky' width={75}/>
      </div>

      <div className="table">
        <button onClick={() => setModalState(ModalState.Add)}>
          Add Duck
        </button>
        <table className='duck-table'>
          <thead>
            <tr>
              <th>Duck ID</th>
              <th>Color</th>
              <th>Size</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {ducks && ducks.sort((a, b) => b.quantity - a.quantity).map(duck => (
            <tr key={duck.id}>
              <td>{duck.id}</td>
              <td>{duck.color}</td>
              <td>{duck.size}</td>
              <td>${duck.price.toFixed(2)}</td>
              <td>{duck.quantity}</td>
              <td>
                <TextButton
                  onClick={() => {
                    setSelectedDuck(duck);
                    setModalState(ModalState.Edit);
                  }}
                >
                  Edit
                </TextButton>
                <TextButton
                  onClick={() => {
                    setSelectedDuck(duck);
                    setModalState(ModalState.Delete);
                  }}
                  color="red"
                >
                  Delete
                </TextButton>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App