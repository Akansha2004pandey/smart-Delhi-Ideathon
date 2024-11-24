# RBAC Admin Dashboard

A modern, secure, and user-friendly Role-Based Access Control (RBAC) administration interface built with React, TypeScript, and Tailwind CSS. This dashboard provides comprehensive user, role, and permission management capabilities with a beautiful, responsive UI.

![Dashboard Preview](https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426&h=1200)

## Features

### User Management
- 👥 Complete user CRUD operations
- 🔍 Real-time search and filtering
- 📊 Status tracking (Active/Inactive)
- 🔄 Role assignment and modification

### Role Management
- 🛡️ Create and manage user roles
- 🎯 Granular permission assignment
- 📝 Role description and documentation
- 🔄 Dynamic permission updates

### Permission Management
- 🔐 Module-based permission organization
- 📋 Comprehensive audit logging
- 🔍 Search and filter capabilities
- 📊 Permission hierarchy visualization

### Security & UX
- 🔒 Type-safe implementation with TypeScript
- 🎨 Modern UI with Tailwind CSS
- 📱 Fully responsive design
- ⚡ Real-time updates with Redux

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router v6
- **Type Safety**: TypeScript
- **Build Tool**: Vite

## Getting Started

1. Clone the repository:
```bash
git clone [repository-url]
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

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Icons provided by [Lucide React](https://lucide.dev)
- UI components inspired by [Tailwind UI](https://tailwindui.com)
- Dashboard layout based on modern best practices
