// Format currency to Indian Lakh format (₹45L)
export const formatCurrency = (amount) => {
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)}L`;
  }
  return `₹${amount.toLocaleString('en-IN')}`;
};

// Format date to readable format
export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

// Get initials from full name
export const getInitials = (name) => {
  if (!name) return '?';
  const parts = name.split(' ');
  if (parts.length >= 2) {
    return parts[0][0] + parts[1][0];
  }
  return name[0];
};

// Get status color classes
export const getStatusColor = (status, lightTheme) => {
  const colors = {
    light: {
      'Approved': 'bg-green-100 text-green-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Rejected': 'bg-red-100 text-red-800',
      'In Review': 'bg-blue-100 text-blue-800'
    },
    dark: {
      'Approved': 'bg-emerald-500/10 text-emerald-400',
      'Pending': 'bg-amber-500/10 text-amber-400',
      'Rejected': 'bg-rose-500/10 text-rose-400',
      'In Review': 'bg-sky-500/10 text-sky-400'
    }
  };
  const colorSet = lightTheme ? colors.light : colors.dark;
  return colorSet[status] || (lightTheme ? 'bg-gray-100 text-gray-800' : 'bg-gray-500/10 text-gray-400');
};