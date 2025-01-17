import { createClient } from '@supabase/supabase-js';
import { PickSecrets } from './utils';

export const createConfigUpdater = (s = {}) => async (config = {}) => {
    const supabaseUrl = 'https://cvxqmusfaxwuyvyuueco.supabase.co'
    const secrets = PickSecrets(s, ['SUPABASE_ACCESS_KEY']);
    const supabaseKey = secrets.SUPABASE_ACCESS_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey)

    const { data, error } = await supabase
        .from('plugin')
        .upsert(config)

    if (error) {
        throw new Error(`Failed to upsert config: ${error.message}`);
    }

    return data;
}