import { NavigationGuard } from 'vue-router';

export default function Multiguard(guards: Array<NavigationGuard>): NavigationGuard;
