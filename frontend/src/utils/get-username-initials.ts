export const getUsernameInitials = (name: string) => {
  const names = name.trim().split(' ');

  if (names.length >= 2) {
    const fistNameInitial = names[0].charAt(0).toUpperCase();
    const lastNameInitial = names[names.length - 1].charAt(0).toUpperCase();

    return `${fistNameInitial}${lastNameInitial}`;
  }

  return names[0].charAt(0).toUpperCase();
};
