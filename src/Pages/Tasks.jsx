import React, { useState, useEffect } from 'react';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [taskTime, setTaskTime] = useState('');
  const [notification, setNotification] = useState(null);

  // Request notification permission on mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  // Check for upcoming tasks and show notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      
      tasks.forEach(task => {
        if (!task.completed && !task.notified) {
          const taskDateTime = new Date(`${task.date}T${task.time}`);
          const timeDiff = taskDateTime - now;
          
          // Notify 5 minutes before
          if (timeDiff > 0 && timeDiff <= 300000) {
            showNotification(task);
            markAsNotified(task.id);
          }
        }
      });
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [tasks]);

  const showNotification = (task) => {
    setNotification(`Reminder: "${task.name}" is due soon!`);
    
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Task Reminder', {
        body: `"${task.name}" is scheduled at ${task.time}`,
        icon: '🔔'
      });
    }
    
    setTimeout(() => setNotification(null), 5000);
  };

  const markAsNotified = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, notified: true } : task
    ));
  };

  const addTask = (e) => {
    e.preventDefault();
    
    if (!taskName || !taskDate || !taskTime) {
      alert('Please fill in all fields');
      return;
    }

    const newTask = {
      id: Date.now(),
      name: taskName,
      date: taskDate,
      time: taskTime,
      completed: false,
      notified: false,
      createdAt: new Date()
    };

    setTasks([...tasks, newTask]);
    setTaskName('');
    setTaskDate('');
    setTaskTime('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Sort tasks by date and time
  const sortedTasks = [...tasks].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateA - dateB;
  });

  const formatDateTime = (date, time) => {
    const dateObj = new Date(`${date}T${time}`);
    return dateObj.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const isOverdue = (date, time, completed) => {
    if (completed) return false;
    const taskDateTime = new Date(`${date}T${time}`);
    return taskDateTime < new Date();
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #eff6ff, #e0e7ff)', padding: '24px' }}>
      <div style={{ maxWidth: '896px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>📅 Task Scheduler</h1>
          <p style={{ color: '#4b5563' }}>Organize your tasks with reminders</p>
        </div>

        {/* Notification Banner */}
        {notification && (
          <div style={{ 
            marginBottom: '24px', 
            background: '#fef3c7', 
            borderLeft: '4px solid #f59e0b', 
            padding: '16px', 
            borderRadius: '8px', 
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center'
          }}>
            <span style={{ fontSize: '24px', marginRight: '12px' }}>🔔</span>
            <p style={{ color: '#92400e', fontWeight: '500' }}>{notification}</p>
          </div>
        )}

        {/* Add Task Form */}
        <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 10px 15px rgba(0,0,0,0.1)', padding: '24px', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1f2937', marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '8px' }}>➕</span>
            Add New Task
          </h2>
          
          <div onSubmit={addTask}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                Task Name
              </label>
              <input
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="Enter task name..."
                style={{ 
                  width: '100%', 
                  padding: '8px 16px', 
                  border: '1px solid #d1d5db', 
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                  Date
                </label>
                <input
                  type="date"
                  value={taskDate}
                  onChange={(e) => setTaskDate(e.target.value)}
                  style={{ 
                    width: '100%', 
                    padding: '8px 16px', 
                    border: '1px solid #d1d5db', 
                    borderRadius: '8px',
                    fontSize: '16px',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                  Time
                </label>
                <input
                  type="time"
                  value={taskTime}
                  onChange={(e) => setTaskTime(e.target.value)}
                  style={{ 
                    width: '100%', 
                    padding: '8px 16px', 
                    border: '1px solid #d1d5db', 
                    borderRadius: '8px',
                    fontSize: '16px',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <button
              onClick={addTask}
              style={{ 
                width: '100%', 
                background: '#2563eb', 
                color: 'white', 
                fontWeight: '600', 
                padding: '12px', 
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseOver={(e) => e.target.style.background = '#1d4ed8'}
              onMouseOut={(e) => e.target.style.background = '#2563eb'}
            >
              <span style={{ marginRight: '8px' }}>➕</span>
              Add Task
            </button>
          </div>
        </div>

        {/* Tasks List */}
        <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 10px 15px rgba(0,0,0,0.1)', padding: '24px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1f2937', marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '8px' }}>🕐</span>
            Scheduled Tasks ({tasks.length})
          </h2>

          {sortedTasks.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 0', color: '#9ca3af' }}>
              <div style={{ fontSize: '64px', marginBottom: '16px', opacity: 0.5 }}>📋</div>
              <p style={{ fontSize: '18px' }}>No tasks scheduled yet</p>
              <p style={{ fontSize: '14px' }}>Add your first task above!</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {sortedTasks.map(task => (
                <div
                  key={task.id}
                  style={{ 
                    padding: '16px', 
                    borderRadius: '8px', 
                    border: '2px solid',
                    borderColor: task.completed ? '#bbf7d0' : (isOverdue(task.date, task.time, task.completed) ? '#fecaca' : '#e5e7eb'),
                    background: task.completed ? '#f0fdf4' : (isOverdue(task.date, task.time, task.completed) ? '#fef2f2' : '#f9fafb')
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', flex: 1 }}>
                      <button
                        onClick={() => toggleComplete(task.id)}
                        style={{ 
                          marginTop: '4px',
                          marginRight: '12px',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '24px'
                        }}
                      >
                        {task.completed ? '✅' : '⭕'}
                      </button>
                      
                      <div style={{ flex: 1 }}>
                        <h3 style={{ 
                          fontSize: '18px', 
                          fontWeight: '600',
                          color: task.completed ? '#6b7280' : '#1f2937',
                          textDecoration: task.completed ? 'line-through' : 'none'
                        }}>
                          {task.name}
                        </h3>
                        
                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '4px', fontSize: '14px', color: '#4b5563', flexWrap: 'wrap', gap: '8px' }}>
                          <span>🕐 {formatDateTime(task.date, task.time)}</span>
                          
                          {isOverdue(task.date, task.time, task.completed) && (
                            <span style={{ padding: '2px 8px', background: '#fecaca', color: '#991b1b', borderRadius: '4px', fontSize: '12px', fontWeight: '600' }}>
                              OVERDUE
                            </span>
                          )}
                          
                          {task.completed && (
                            <span style={{ padding: '2px 8px', background: '#bbf7d0', color: '#166534', borderRadius: '4px', fontSize: '12px', fontWeight: '600' }}>
                              COMPLETED
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => deleteTask(task.id)}
                      style={{ 
                        marginLeft: '16px',
                        color: '#ef4444',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '8px',
                        borderRadius: '8px',
                        fontSize: '20px'
                      }}
                      onMouseOver={(e) => e.target.style.background = '#fee2e2'}
                      onMouseOut={(e) => e.target.style.background = 'none'}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Tasks;
