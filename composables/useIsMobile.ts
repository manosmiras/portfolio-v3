import { ref, onMounted, onBeforeUnmount } from 'vue';

export function useIsMobile(breakpoint = 768) {
    const isMobile = ref(false);
    let mql: MediaQueryList | null = null;

    const update = () => {
        isMobile.value = !!mql?.matches;
    };

    onMounted(() => {
        mql = window.matchMedia(`(max-width: ${breakpoint}px)`);
        update();
        mql.addEventListener('change', update);
    });

    onBeforeUnmount(() => {
        mql?.removeEventListener('change', update);
    });

    return { isMobile };
}
