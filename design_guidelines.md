# Sweet Shop Management System Design Guidelines

## Design Approach
**System-Based Approach**: Using Material Design principles for this data-rich application with forms, inventory management, and administrative functions. The focus is on clarity, efficiency, and professional appearance suitable for both customers and admin users.

## Core Design Elements

### Color Palette
**Primary Colors:**
- Light Mode: Primary (219 69% 56%), Surface (0 0% 98%)
- Dark Mode: Primary (219 69% 65%), Surface (222 47% 11%)

**Supporting Colors:**
- Success: 142 76% 36% (for purchase confirmations)
- Warning: 38 92% 50% (for low stock alerts)
- Error: 0 84% 60% (for out-of-stock items)

### Typography
**Font System**: Roboto from Google Fonts
- Headlines: Roboto Medium (24px, 20px, 18px)
- Body: Roboto Regular (16px, 14px)
- Captions: Roboto Regular (12px)

### Layout System
**Spacing Units**: Consistent Tailwind spacing - primarily using units 2, 4, 6, and 8
- Component padding: p-4, p-6
- Section margins: m-6, m-8
- Element gaps: gap-4, gap-6

## Component Library

### Navigation
- Clean header with app logo, navigation links, and user account dropdown
- Sidebar navigation for admin panel with clear section divisions
- Breadcrumbs for deep navigation states

### Forms
- Material-style input fields with floating labels
- Clear validation states with inline error messages
- Consistent button styling with primary/secondary variants
- Form sections grouped with subtle borders

### Data Displays
- Card-based layout for sweet inventory items
- Clean data tables for admin inventory management
- Search and filter controls prominently placed
- Loading states and empty states for all data views

### Sweet Inventory Cards
- Product image placeholder (150x150px)
- Sweet name, price, and stock quantity clearly displayed
- Purchase button with disabled state for out-of-stock items
- Admin actions (edit/delete) visible only to admin users

### Admin Interface
- Tabbed interface for different admin functions
- Modal dialogs for add/edit sweet forms
- Confirmation dialogs for destructive actions
- Quick stats dashboard showing inventory overview

### Overlays
- Modal dialogs for forms and confirmations
- Toast notifications for success/error feedback
- Loading overlays for async operations

## Images
No large hero images needed for this utility-focused application. Product placeholder images (150x150px) for each sweet item in a clean, consistent style. Consider using a subtle pattern or solid color backgrounds for missing product images.

## Key Principles
- **Clarity First**: Every interface element should have a clear purpose
- **Consistent Spacing**: Maintain rhythm with the 4-unit spacing system
- **Accessible Contrast**: Ensure all text meets WCAG AA standards
- **Progressive Disclosure**: Show relevant actions based on user role
- **Efficient Workflows**: Minimize clicks for common tasks like purchasing and inventory management