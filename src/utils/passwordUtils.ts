
interface PasswordStrength {
  strength: number;
  text: string;
  color: string;
}

export const getPasswordStrength = (password: string): PasswordStrength => {
  if (!password) return { strength: 0, text: "", color: "" };
  
  let strength = 0;
  if (password.length >= 8) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[a-z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;
  
  let text = "";
  let color = "";
  
  switch (strength) {
    case 0:
    case 1:
      text = "Très faible";
      color = "bg-red-500";
      break;
    case 2:
      text = "Faible";
      color = "bg-orange-500";
      break;
    case 3:
      text = "Moyen";
      color = "bg-yellow-500";
      break;
    case 4:
      text = "Fort";
      color = "bg-green-500";
      break;
    case 5:
      text = "Très fort";
      color = "bg-green-600";
      break;
    default:
      text = "";
      color = "";
  }
  
  return { strength: (strength / 5) * 100, text, color };
};
