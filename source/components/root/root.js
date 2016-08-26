import app from 'app';
import template from './root.html';

app.component('root', {
    controller: class {
        constructor(TestService) {
            console.log('controller')
        }
    },
    template
});