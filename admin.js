document.addEventListener('DOMContentLoaded', () => {
    // --- Authentication Check ---
    if (sessionStorage.getItem('isAdminLoggedIn') !== 'true') {
        window.location.href = '/admin-login/';
        return;
    }

    // --- DOM Elements ---
    const sections = document.querySelectorAll('.admin-section');
    const navLinks = document.querySelectorAll('.admin-nav a');
    const logoutBtn = document.getElementById('logout-btn');
    const modal = document.getElementById('edit-user-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalCancelBtn = document.getElementById('modal-cancel-btn');
    const editUserForm = document.getElementById('edit-user-form');

    // --- State ---
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    let users = JSON.parse(localStorage.getItem('grock_users')) || [];
    let emails = JSON.parse(localStorage.getItem('grock_emails')) || [];

    // --- Functions ---
    const renderDashboard = () => {
        document.getElementById('total-orders').textContent = orders.length;
        document.getElementById('total-users').textContent = users.length;
        document.getElementById('total-emails').textContent = emails.length;
        document.getElementById('unread-emails').textContent = emails.filter(e => !e.read).length;
    };

    const renderOrders = () => {
        const container = document.getElementById('admin-orders-list');
        container.innerHTML = '';
        if (orders.length === 0) {
            container.innerHTML = '<p>No orders to display.</p>';
            return;
        }

        orders.slice().reverse().forEach(order => {
            const card = document.createElement('div');
            card.className = 'order-card';
            card.innerHTML = `
                <div class="order-header">
                    <h3>Order #${order.orderId.split('_')[1]}</h3>
                    <div class="status-control">
                        <label for="status-${order.orderId}">Status: </label>
                        <select class="status-select" data-order-id="${order.orderId}">
                            <option value="Pending" ${order.status === 'Pending' ? 'selected' : ''}>Pending</option>
                            <option value="In Progress" ${order.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                            <option value="Delivered" ${order.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
                        </select>
                    </div>
                </div>
                <div class="order-details">
                     <div class="detail-item">
                        <strong>Customer Details</strong>
                        <p>
                            Name: ${order.customer.name}<br>
                            Email: ${order.customer.email}<br>
                            Phone: ${order.customer.phone}
                        </p>
                    </div>
                    <div class="detail-item">
                        <strong>Plan Details</strong>
                        <p>
                            Plan: ${order.plan.name} (${order.plan.duration} Months)<br>
                            Total Paid: ₹${order.plan.total}
                        </p>
                    </div>
                    <div class="detail-item">
                        <strong>Project Requirements</strong>
                        <p>
                            <strong>Website Type:</strong><br>${order.project.websiteType}<br><br>
                            <strong>Design Style:</strong><br>${order.project.designStyle}<br><br>
                            <strong>Features Needed:</strong><br>${order.project.featuresNeeded}
                        </p>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    };

    const renderUsers = () => {
        const container = document.getElementById('admin-users-list');
        container.innerHTML = '';
        if (users.length === 0) {
            container.innerHTML = '<p>No users to display.</p>';
            return;
        }
        
        container.innerHTML = `
            <div class="admin-table-wrapper">
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Password</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${users.map(user => `
                            <tr>
                                <td>${user.name}</td>
                                <td>${user.email}</td>
                                <td>${user.phone}</td>
                                <td>${user.password}</td>
                                <td><button class="btn btn-secondary edit-user-btn" data-email="${user.email}">Edit</button></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            <p style="font-size: 0.8rem; color: #64748b; margin-top: 1rem;">Note: Passwords are shown for demonstration purposes. In a real application, they should be securely hashed and never displayed.</p>
        `;
    };

    const renderEmails = (selectedEmailId = null) => {
        const container = document.getElementById('admin-emails-container');
        emails = JSON.parse(localStorage.getItem('grock_emails')) || []; // Re-fetch
        
        if (selectedEmailId) {
            const email = emails.find(e => e.id === selectedEmailId);
            if (email) {
                container.innerHTML = `
                    <div class="email-view">
                        <button class="btn btn-secondary" id="back-to-inbox-btn" style="margin-bottom: 1.5rem;">&larr; Back to Inbox</button>
                        <div class="email-view-header">
                            <h2>${email.subject}</h2>
                            <div class="email-view-meta">
                                <p><strong>From:</strong> ${email.name} &lt;${email.email}&gt;</p>
                                <p><strong>Date:</strong> ${new Date(email.date).toLocaleString()}</p>
                            </div>
                        </div>
                        <div class="email-view-body">${email.message}</div>
                    </div>
                `;
            }
        } else {
             if (emails.length === 0) {
                container.innerHTML = '<p>No emails to display.</p>';
                return;
            }
            container.innerHTML = `
                <ul class="email-list">
                    ${emails.map(email => `
                        <li class="email-item ${email.read ? '' : 'unread'}" data-id="${email.id}">
                            <div class="email-details">
                                <div class="email-subject">${email.subject}</div>
                                <div class="email-sender">${email.name}</div>
                            </div>
                            <div class="email-date">${new Date(email.date).toLocaleDateString()}</div>
                        </li>
                    `).join('')}
                </ul>
            `;
        }
    };

    const handleStatusChange = (e) => {
        const orderId = e.target.dataset.orderId;
        const newStatus = e.target.value;
        const orderIndex = orders.findIndex(o => o.orderId === orderId);
        if (orderIndex > -1) {
            orders[orderIndex].status = newStatus;
            localStorage.setItem('orders', JSON.stringify(orders));
            renderDashboard();
        }
    };

    const openEditUserModal = (email) => {
        const user = users.find(u => u.email === email);
        if (user) {
            document.getElementById('edit-user-email').value = user.email;
            document.getElementById('edit-user-name').value = user.name;
            document.getElementById('edit-user-phone').value = user.phone;
            document.getElementById('edit-user-password').value = '';
            modal.classList.add('active');
        }
    };
    
    const closeEditUserModal = () => {
        modal.classList.remove('active');
    };

    const handleUpdateUser = (e) => {
        e.preventDefault();
        const email = document.getElementById('edit-user-email').value;
        const newName = document.getElementById('edit-user-name').value;
        const newPhone = document.getElementById('edit-user-phone').value;
        const newPassword = document.getElementById('edit-user-password').value;

        const userIndex = users.findIndex(u => u.email === email);
        if (userIndex > -1) {
            users[userIndex].name = newName;
            users[userIndex].phone = newPhone;
            if (newPassword) {
                users[userIndex].password = newPassword;
            }
            localStorage.setItem('grock_users', JSON.stringify(users));
            renderUsers();
            closeEditUserModal();
        }
    };

    const showSection = (targetId) => {
        sections.forEach(section => {
            section.style.display = section.id === targetId ? 'block' : 'none';
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.target === targetId);
        });
        // Render content when section is shown
        if (targetId === 'users') renderUsers();
        if (targetId === 'emails') renderEmails();
    };

    // --- Event Listeners ---
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showSection(e.target.dataset.target);
        });
    });

    logoutBtn.addEventListener('click', () => {
        sessionStorage.removeItem('isAdminLoggedIn');
        window.location.href = '/admin-login/';
    });
    
    document.getElementById('admin-orders-list').addEventListener('change', (e) => {
        if (e.target.classList.contains('status-select')) {
            handleStatusChange(e);
        }
    });

    document.getElementById('admin-users-list').addEventListener('click', (e) => {
        if (e.target.classList.contains('edit-user-btn')) {
            openEditUserModal(e.target.dataset.email);
        }
    });

    document.getElementById('admin-emails-container').addEventListener('click', (e) => {
        const emailItem = e.target.closest('.email-item');
        if (emailItem) {
            const emailId = emailItem.dataset.id;
            const emailIndex = emails.findIndex(em => em.id === emailId);
            if (emailIndex > -1 && !emails[emailIndex].read) {
                emails[emailIndex].read = true;
                localStorage.setItem('grock_emails', JSON.stringify(emails));
                renderDashboard();
            }
            renderEmails(emailId);
        }
        if (e.target.id === 'back-to-inbox-btn') {
            renderEmails();
        }
    });

    modalCloseBtn.addEventListener('click', closeEditUserModal);
    modalCancelBtn.addEventListener('click', closeEditUserModal);
    editUserForm.addEventListener('submit', handleUpdateUser);

    // --- Initial Render ---
    renderDashboard();
    renderOrders();
});
