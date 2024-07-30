"use client";

export function AddContact() {
  function handleSubmit() {
    // check if already created
    // create friendship, if not exist
    // create a contact with specified name
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <input placeholder="UUID" type="text" />
      <input placeholder="Name" type="text" />
      <input type="submit" />
    </form>
  );
}
