export function get(
  url: string,
  callback: (
    err: { status: number; readyState: number } | null,
    responseText: string
  ) => void
) {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);

  xhr.onload = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      callback(null, xhr.responseText);
    } else {
      callback(
        { status: xhr.status, readyState: xhr.readyState },
        xhr.responseText
      );
    }
  };

  xhr.send(null);
}
