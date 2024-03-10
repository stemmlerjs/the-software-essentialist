const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      className={'tw-container tw-mx-auto tw-p-4 tw-text-sm tw-text-center'}
    >
      &copy; embryCODE {year}
    </footer>
  );
};

export { Footer };
