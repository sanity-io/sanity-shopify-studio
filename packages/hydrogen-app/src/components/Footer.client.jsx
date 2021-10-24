import {Link} from '@shopify/hydrogen/client';
import {useNavigationContext} from '../contexts/NavigationContext.client';
import PortableText from '../components/PortableText.client';

export default function Footer() {
  const data = useNavigationContext();

  return (
    <footer role="contentinfo" className="border-t border-black mt-32 p-4">
      {/* Links */}
      {data?.footer?.links?.map((link, index) => {
        if (link._type === 'linkExternal') {
          return (
            <div key={index}>
              <a href={link.url} target={link.newWindow ? '_blank' : '_self'}>
                {link.title}
              </a>
            </div>
          );
        }
        if (link._type === 'linkInternal') {
          return (
            <div key={index}>
              <Link to={link.slug}>{link.title}</Link>
            </div>
          );
        }
      })}

      {data?.footer?.text && (
        <PortableText className="text-gray-400" blocks={data.footer.text} />
      )}
    </footer>
  );
}
