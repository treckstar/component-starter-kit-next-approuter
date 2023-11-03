import { FC } from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { UniformSlot, ComponentProps, registerUniformComponent } from '@uniformdev/canvas-next-rsc';
import { ScreenContainer } from '@/components/Container';
import { getImageUrl } from '@/utils';
import Logo from '@/components/Logo/Logo';

type HeaderProps = ComponentProps<{
  logo: string | Types.CloudinaryImage;
  theme: string;
  linksAlignment: Types.HorizontalAlignment;
}>;

enum HeaderVariants {
  Light = 'light',
}

const getHeaderColor = (variant?: string) => {
  switch (variant) {
    case HeaderVariants.Light:
      return 'bg-base-200';
    default:
      return 'bg-base-300';
  }
};

const getLinksAlignment = (alignment?: Types.HorizontalAlignment) => {
  switch (alignment) {
    case 'left':
      return 'justify-start';
    case 'center':
      return 'justify-center';
    case 'right':
      return 'justify-end';
    default:
      return 'justify-end';
  }
};

const Header: FC<HeaderProps> = ({ logo, component, context, linksAlignment }) => (
  <div className={classNames('text-primary-content', getHeaderColor(component.variant))}>
    <ScreenContainer>
      <div className="navbar px-0">
        <div className="navbar-start w-full">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost hover:bg-transparent px-0 lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </label>
            <ul tabIndex={0} className="menu menu-compact dropdown-content p-2 shadow w-52 bg-base-300">
              <div>
                <UniformSlot
                  name="links"
                  data={component}
                  context={context}
                />
              </div>
            </ul>
          </div>
          <Link className="ml-8 lg:ml-0" href="/">
          <Logo />
        </Link>
        <div className={classNames('hidden lg:flex w-full', getLinksAlignment(linksAlignment))}>
          <ul className="menu menu-horizontal px-1 shrink-0">
            <UniformSlot
              name="links"
              data={component}
              context={context}
            />
          </ul>
        </div>
        </div>
        <div className="hidden lg:flex">
          <UniformSlot
            name="iconLinks"
            emptyPlaceholder={null}
            data={component}
            context={context}
          />
        </div>
      </div>
    </ScreenContainer>
  </div>
);

[undefined, HeaderVariants.Light].forEach(variantId => {
  registerUniformComponent({
    type: 'header',
    component: Header,
    variantId,
  });
});

export default Header;
