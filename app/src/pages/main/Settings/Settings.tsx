import { useEffect } from 'react';
import Body from './Body';

const Settings = () => {
    useEffect(() => {
        ($('.ui.dropdown') as any).dropdown();
        // === Model === //
        ($('.ui.modal') as any).modal({ blurring: true }).modal('show');
        // === Tab === //
        ($('.menu .item') as any).tab();
        // === checkbox Toggle === //
        ($('.ui.checkbox') as any).checkbox();
        // === Toggle === //
        $('.enable.button').on('click', function () {
            ($(this).nextAll('.checkbox') as any).checkbox('enable');
        });
    }, []);
    return <Body />;
};

export default Settings;
