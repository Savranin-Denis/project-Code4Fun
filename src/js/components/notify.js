import Swal from 'sweetalert2';

export function notifyError(
  title,
  text = 'Спробуйте оновити сторінку трохи пізніше.'
) {
  return Swal.fire({
    icon: 'error',
    title,
    text,
  });
}

export function notifySuccess(title, text) {
  return Swal.fire({
    icon: 'success',
    title,
    text,
  });
}
