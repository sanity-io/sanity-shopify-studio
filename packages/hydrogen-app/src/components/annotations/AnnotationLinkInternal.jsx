const AnnotationLinkInternal = (props) => {
  const {children, mark} = props;

  return (
    <a className="underline" href={mark?.slug}>
      {children}
    </a>
  );
};

export default AnnotationLinkInternal;
