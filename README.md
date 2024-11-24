# PERMIGO-RBAC Admin Dashboard  

A modern, secure, and user-friendly Role-Based Access Control (RBAC) administration interface built with React, TypeScript, and Tailwind CSS. This dashboard enables comprehensive management of users, roles, and permissions with a responsive and intuitive UI.  

### 🌐 Live Demo  
🚀 [**Check out the live demo here**](https://permigo-dashboard.vercel.app/)  

---

## Features  

### 🔹 User Management  
- 👥 Complete user CRUD operations  
- 🔍 Real-time search and filtering  
- 📊 Status tracking (Active/Inactive)  
- 🔄 Role assignment and modification  

### 🔹 Role Management  
- 🛡️ Create and manage user roles  
- 🎯 Granular permission assignment  
- 📝 Role description and documentation  
- 🔄 Dynamic permission updates  

### 🔹 Permission Management  
- 🔐 Module-based permission organization  
- 📋 Comprehensive audit logging  
- 🔍 Search and filter capabilities  
- 📊 Permission hierarchy visualization  

### 🔹 Security & UX  
- 🔒 Type-safe implementation with TypeScript  
- 🎨 Modern UI with Tailwind CSS  
- 📱 Fully responsive design  
- ⚡ Real-time updates with Redux  

---

## Tech Stack  

<div align="center">

| **Technology**     | **Purpose**                       |  
|---------------------|-----------------------------------|  
| ![React](https://img.shields.io/badge/React-v18-blue?logo=react&style=flat-square)  | Frontend Framework |  
| ![TypeScript](https://img.shields.io/badge/TypeScript-v4-blue?logo=typescript&style=flat-square) | Type Safety |  
| ![Redux](https://img.shields.io/badge/Redux-Toolkit-purple?logo=redux&style=flat-square) | State Management |  
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v3-blue?logo=tailwindcss&style=flat-square) | Styling |  
| ![Vite](https://img.shields.io/badge/Vite-Build%20Tool-orange?logo=vite&style=flat-square) | Build Tool |  
| ![React Router](https://img.shields.io/badge/React%20Router-v6-blue?logo=react-router&style=flat-square) | Routing |  

</div>  

---

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/coolCoderD/Permigo-RABC-Dashboard-.git
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── layout/        # Layout components
│   ├── users/         # User management components
│   ├── roles/         # Role management components
│   └── permissions/   # Permission management components
├── pages/             # Page components
├── store/             # Redux store and slices
│   └── slices/        # Redux reducers and actions
├── types/             # TypeScript interfaces
└── App.tsx            # Main application component
```

## Key Components

### DashboardLayout
- Main layout wrapper
- Responsive sidebar navigation
- Top navigation bar with user controls

### User Management
- UserTable: Displays user list with sorting and filtering
- UserModal: Form for creating/editing users
- Status toggle functionality

### Role Management
- RoleModal: Interface for role creation/modification
- PermissionSelect: Multi-select permission assignment
- Role hierarchy display

### Permission Management
- Module-based permission grouping
- Audit logging system
- Search and filter capabilities

## State Management

The application uses Redux Toolkit for state management with the following slices:

- `usersSlice`: User management state
- `rolesSlice`: Role management state
- `permissionsSlice`: Permission management state

## Security Considerations

- Input validation on all forms
- Type-safe operations with TypeScript
- Secure role-based access control
- Audit logging for permission changes

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Acknowledgments

- Icons provided by [Lucide React](https://lucide.dev)
- UI components inspired by [Tailwind UI](https://tailwindui.com)
- Dashboard layout based on modern best practices
