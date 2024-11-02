document.addEventListener('DOMContentLoaded', () => {
    const requestForm = document.getElementById('requestForm');
    const requestsList = document.getElementById('requestsList');
    const filterPriority = document.getElementById('filterPriority');
    const filterDepartment = document.getElementById('filterDepartment');
    
    let requests = JSON.parse(localStorage.getItem('requests')) || [];
    
    const saveRequests = () => {
        localStorage.setItem('requests', JSON.stringify(requests));
    };
    
    const createRequestCard = (request) => {
        const card = document.createElement('div');
        card.className = 'request-card';
        
        const priorityClass = `priority-${request.priority}`;
        const date = new Date(request.date).toLocaleDateString('fa-IR');
        
        card.innerHTML = `
            <div class="request-header">
                <h3>${request.title}</h3>
                <span class="priority-badge ${priorityClass}">
                    ${request.priority === 'high' ? 'زیاد' : request.priority === 'medium' ? 'متوسط' : 'کم'}
                </span>
            </div>
            <p><strong>دپارتمان:</strong> ${
                request.department === 'it' ? 'فناوری اطلاعات' :
                request.department === 'hr' ? 'منابع انسانی' : 'مالی'
            }</p>
            <p><strong>تاریخ:</strong> ${date}</p>
            <p><strong>توضیحات:</strong> ${request.description}</p>
        `;
        
        return card;
    };
    
    const updateRequestsList = () => {
        requestsList.innerHTML = '';
        let filteredRequests = [...requests];
        
        if (filterPriority.value) {
            filteredRequests = filteredRequests.filter(r => r.priority === filterPriority.value);
        }
        
        if (filterDepartment.value) {
            filteredRequests = filteredRequests.filter(r => r.department === filterDepartment.value);
        }
        
        filteredRequests.forEach(request => {
            requestsList.appendChild(createRequestCard(request));
        });
    };
    
    requestForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newRequest = {
            title: document.getElementById('title').value,
            department: document.getElementById('department').value,
            priority: document.getElementById('priority').value,
            description: document.getElementById('description').value,
            date: new Date().toISOString()
        };
        
        requests.unshift(newRequest);
        saveRequests();
        updateRequestsList();
        requestForm.reset();
    });
    
    filterPriority.addEventListener('change', updateRequestsList);
    filterDepartment.addEventListener('change', updateRequestsList);
    
    updateRequestsList();
});
