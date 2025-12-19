/**
 * External Link Component
 *
 * Opens external URLs in an in-app browser on native platforms.
 * On web, opens in a new tab.
 */

import { openBrowserAsync, WebBrowserPresentationStyle } from 'expo-web-browser';
import { type ComponentProps, Pressable, Text } from 'react';
import { Platform } from 'react-native';

type Props = {
  href: string;
  children: React.ReactNode;
} & Omit<ComponentProps<typeof Pressable>, 'onPress'>;

export function ExternalLink({ href, children, ...rest }: Props) {
  async function handlePress(event: any) {
    if (Platform.OS !== 'web') {
      // Prevent the default behavior of linking to the default browser on native.
      event.preventDefault();
      // Open the link in an in-app browser.
      await openBrowserAsync(href, {
        presentationStyle: WebBrowserPresentationStyle.AUTOMATIC,
      });
    } else {
      // On web, open in a new tab
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  }

  return (
    <Pressable onPress={handlePress} {...rest}>
      {typeof children === 'string' ? <Text>{children}</Text> : children}
    </Pressable>
  );
}
