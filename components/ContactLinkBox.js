import { Icon, IconButton, Link } from '@chakra-ui/react';

export default function ContactLinkBox({
  link,
  backgroundColor,
  icon,
  style,
  ...props
}) {
  return (
    <Link href={link} isExternal style={{ textDecoration: 'none' }}>
      <IconButton
        bg={backgroundColor}
        style={style}
        boxSize="50px"
        rounded="xl"
        icon={<Icon as={icon} boxSize="6" {...props} />}
      />
    </Link>
  );
}
