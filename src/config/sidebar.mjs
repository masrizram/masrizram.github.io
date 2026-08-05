// Struktur navigasi samping Starlight — diekstrak dari astro.config.mjs
// agar config tetap ramping & mudah di-scale (tambah modul = edit di sini).
export const sidebar = [
  {
    label: 'RHCSA',
    items: [
      { label: 'Beranda RHCSA', link: '/rhcsa/' },
      {
        label: 'Modul',
        items: [
          { label: '00 Pengantar & Roadmap', link: '/rhcsa/modul/00-pengantar-dan-roadmap/' },
          { label: '01 Get Started RHEL', link: '/rhcsa/modul/01-get-started-rhel/' },
          { label: '02 Access Command Line', link: '/rhcsa/modul/02-access-command-line/' },
          { label: '03 Manage Files', link: '/rhcsa/modul/03-manage-files/' },
          { label: '04 Get Help', link: '/rhcsa/modul/04-get-help/' },
          { label: '05 Text Files', link: '/rhcsa/modul/05-text-files/' },
          { label: '06 Users & Groups', link: '/rhcsa/modul/06-users-groups/' },
          { label: '07 File Permissions', link: '/rhcsa/modul/07-file-permissions/' },
          { label: '08 Processes', link: '/rhcsa/modul/08-processes/' },
          { label: '09 Services & Daemons', link: '/rhcsa/modul/09-services-daemons/' },
          { label: '10 SSH', link: '/rhcsa/modul/10-ssh/' },
          { label: '11 Networking', link: '/rhcsa/modul/11-networking/' },
          { label: '12 Software (DNF)', link: '/rhcsa/modul/12-software-dnf/' },
          { label: '13 Filesystems', link: '/rhcsa/modul/13-filesystems/' },
          { label: '14 Support', link: '/rhcsa/modul/14-support/' },
          { label: '15 Podman Containers', link: '/rhcsa/modul/15-podman-containers/' },
          { label: '16 SELinux', link: '/rhcsa/modul/16-selinux/' },
          { label: '17 Scheduling', link: '/rhcsa/modul/17-scheduling/' },
          { label: '18 EX200 Prep', link: '/rhcsa/modul/18-ex200-prep/' },
          { label: '19 Skenario EX200', link: '/rhcsa/modul/19-skenario-ex200/' },
          { label: '20 Shell Scripting', link: '/rhcsa/modul/20-shell-scripting/' },
          { label: '21 Enterprise System Engineer', link: '/rhcsa/modul/21-enterprise-system-engineer/' },
          { label: '22 Runbook Troubleshooting', link: '/rhcsa/modul/22-runbook-troubleshooting-production/' },
          { label: '23 RHCE (EX294) Ansible', link: '/rhcsa/modul/23-rhce-ex294-ansible/' },
        ],
      },
      {
        label: 'Lab',
        items: [
          { label: 'LAB', link: '/rhcsa/lab/LAB/' },
        ],
      },
      {
        label: 'Referensi',
        items: [
          { label: 'Break & Fix', link: '/rhcsa/referensi/BREAK-FIX/' },
          { label: 'Cheatsheet', link: '/rhcsa/referensi/CHEATSHEET/' },
          { label: 'Checklist H1', link: '/rhcsa/referensi/CHECKLIST-H1/' },
          { label: 'EX200 Prep', link: '/rhcsa/referensi/EX200-prep/' },
          { label: 'Glosarium', link: '/rhcsa/referensi/GLOSARIUM/' },
          { label: 'On-Call Drill', link: '/rhcsa/referensi/ONCALL-DRILL/' },
          { label: 'Pocket Runbook', link: '/rhcsa/referensi/POCKET-RUNBOOK/' },
          { label: 'Simulasi Ujian', link: '/rhcsa/referensi/SIMULASI-UJIAN/' },
          { label: 'Sumber EX200', link: '/rhcsa/referensi/SUMBER-EX200/' },
        ],
      },
      { label: 'Pusat Belajar', link: '/rhcsa/pusat-belajar/' },
    ],
  },
  {
    label: 'Pentester',
    items: [
      { label: 'Beranda Pentester', link: '/pentester/' },
    ],
  },
  {
    label: 'Koding',
    items: [
      { label: 'Beranda Koding', link: '/koding/' },
    ],
  },
];
