import { html } from 'lit';
import '../src/shoe-market-app.js';

export default {
  title: 'ShoeMarketApp',
  component: 'shoe-market-app',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

function Template({ header, backgroundColor }) {
  return html`
    <shoe-market-app
      style="--shoe-market-app-background-color: ${backgroundColor || 'white'}"
      .header=${header}
    >
    </shoe-market-app>
  `;
}

export const App = Template.bind({});
App.args = {
  header: 'My app',
};
