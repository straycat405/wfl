// import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import { ClipboardDocumentListIcon, ComputerDesktopIcon, CloudArrowDownIcon, ChartBarSquareIcon } from '@heroicons/react/24/outline'

const features = [
  {
    name: '온라인 웹 서비스',
    description:
      '회원가입을 통한 서비스 접근, 관리자 권한 설정 등 기본적인 온라인 웹 서비스 기능 포함',
    icon: ComputerDesktopIcon,
  },
  {
    name: '가계부',
    description:
      '가계부의 기능에 중점을 둔 자동 / 수동 입력식 자산관리 시스템 및 조회 기능',
    icon: ClipboardDocumentListIcon,
  },
  {
    name: '데이터 백업',
    description:
      '조회한 가계부의 엑셀파일로 다운로드 / 업로드를 통한 데이터 백업 기능',
    icon: CloudArrowDownIcon,
  },
  {
    name: '시각적 데이터 표현',
    description:
      '차트,그래프 등의 시각적 데이터를 바탕으로 한 통계 표현 포함',
    icon: ChartBarSquareIcon,
  },
]

export default function Feature() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-green-500">WFL의 주요 특징</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            가계부를 포함한 다양한 기능 지원
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            커뮤니티, 데이터 조회, 엑셀 업로드/다운로드 등 다양한 기능을 지원합니다.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-green-600">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}