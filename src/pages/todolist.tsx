import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import NavBar from "../components/MainNavbar";

interface TaskTextProps {
  completed: boolean;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const popUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const AppWrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: black;
  color: #e1306c;
`;

const TodoItemWrapper = styled.li<TaskTextProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid #ddd;
  width: 80%;
  animation: ${(props) => (props.completed ? fadeIn : "")} 0.5s forwards;
  opacity: 1;
  transition: opacity 0.5s;
`;

const TaskText = styled.span<TaskTextProps>`
  flex-grow: 1;
  margin-right: 16px;
  font-size: 20px;
  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
`;

const RemoveButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #ff0000;
  font-size: 18px;
`;

const CompleteButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #008000;
  font-size: 18px;
`;

const ConfirmWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ConfirmBox = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
`;

const ConfirmMessage = styled.p`
  font-size: 18px;
  margin-bottom: 10px;
`;

const Timer = styled.span`
  font-size: 18px;
  color: #e1306c;
`;

const ConfirmButton = styled.button`
  margin: 0 10px;
  padding: 8px 16px;
  background-color: #e1306c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const CircleTick = styled.div`
  width: 30px;
  height: 30px;
  background-color: #008000;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  position: absolute;
  animation: ${fadeOut} 0.5s ease-in-out 4s forwards;
`;

const TickBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
  animation: ${popUp} 0.5s forwards;
`;

const Tick = styled.div`
  width: 50px;
  height: 50px;
  background-color: #008000;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 30px;
`;

const CompletedText = styled.p`
  font-size: 24px;
  margin-top: 10px;
`;

const ToDoList: React.FC = () => {
  const [todoList, setTodoList] = useState<
    { task: string; completed: boolean }[]
  >([]);
  const [newTask, setNewTask] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [confirmingIndex, setConfirmingIndex] = useState<number | null>(null);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [secondsLeft, setSecondsLeft] = useState<number>(10);
  const [showTick, setShowTick] = useState(false);

  useEffect(() => {
    if (confirmingIndex !== null) {
      setTimer(
        setInterval(() => {
          setSecondsLeft((prevSeconds) => prevSeconds - 1);
        }, 1000)
      );
    } else {
      clearInterval(timer as NodeJS.Timeout);
      setTimer(null);
      setSecondsLeft(10);
    }
    return () => clearInterval(timer as NodeJS.Timeout);
  }, [confirmingIndex]);

  useEffect(() => {
    if (secondsLeft === 0) {
      handleConfirm();
    }
  }, [secondsLeft]);

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTodoList([...todoList, { task: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const handleRemoveTask = (index: number) => {
    setTodoList(todoList.filter((_, i) => i !== index));
    setConfirmingIndex(null);
  };

  const handleEditTask = (index: number) => {
    setEditingIndex(index);
    setConfirmingIndex(null);
  };

  const handleCompleteTask = (index: number) => {
    setConfirmingIndex(index);
    setEditingIndex(null);
  };

  const handleConfirm = () => {
    const newList = [...todoList];
    newList[confirmingIndex as number].completed = true;
    setTodoList(newList);
    setConfirmingIndex(null);
    setShowTick(true);
    setTimeout(() => {
      setShowTick(false);
    }, 5000);
  };

  // Remove completed tasks
  useEffect(() => {
    setTodoList(todoList.filter((task) => !task.completed));
  }, [todoList]);

  return (
    <AppWrapper>
      <h1 style={{ fontSize: "40px", marginBottom: "20px" }}>To-Do List</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter a task..."
        style={{
          fontSize: "18px",
          marginBottom: "20px",
          width: "40%",
          marginLeft: "-1%",
        }}
      />
      <button
        onClick={handleAddTask}
        style={{ fontSize: "18px", marginBottom: "20px", marginLeft: "-1%" }}
      >
        Add Task
      </button>
      <ul style={{ width: "60%", padding: 0, marginLeft: "8%" }}>
        {todoList.map((item, index) => (
          <TodoItemWrapper key={index} completed={item.completed}>
            {editingIndex === index ? (
              <input
                type="text"
                value={item.task}
                onChange={(e) => {
                  const newList = [...todoList];
                  newList[index].task = e.target.value;
                  setTodoList(newList);
                }}
                style={{ fontSize: "18px", flexGrow: 1 }}
              />
            ) : (
              <TaskText completed={item.completed}>{item.task}</TaskText>
            )}
            <div>
              <button
                onClick={() => handleEditTask(index)}
                style={{ fontSize: "18px" }}
              >
                Edit
              </button>
              <CompleteButton
                onClick={() => handleCompleteTask(index)}
                style={{ fontSize: "18px" }}
              >
                Complete
              </CompleteButton>
              <RemoveButton
                onClick={() => handleRemoveTask(index)}
                style={{ fontSize: "18px" }}
              >
                Remove
              </RemoveButton>
            </div>
            {item.completed && showTick && (
              <TickBox>
                <Tick>✔</Tick>
                <CompletedText>Task Completed</CompletedText>
              </TickBox>
            )}
          </TodoItemWrapper>
        ))}
      </ul>
      {confirmingIndex !== null && (
        <ConfirmWrapper>
          <ConfirmBox>
            <ConfirmMessage>
              Are you sure you want to complete this task?
            </ConfirmMessage>
            <Timer>{secondsLeft} seconds left</Timer>
            <div>
              <ConfirmButton onClick={handleConfirm}>Yes</ConfirmButton>
              <ConfirmButton onClick={() => setConfirmingIndex(null)}>
                No
              </ConfirmButton>
            </div>
          </ConfirmBox>
        </ConfirmWrapper>
      )}
    </AppWrapper>
  );
};

export function ToDo() {
  return (
    <>
      <NavBar />
      <ToDoList />
    </>
  );
}
