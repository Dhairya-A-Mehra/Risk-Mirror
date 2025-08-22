import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, CircleDashed, AlertCircle } from "lucide-react";
import { Plan } from "@/models/plan"; 
import { Skeleton } from "@/components/ui/skeleton"; 

interface ReusablePlanWidgetProps {
  plan: Plan | null;
  dummyPlan: Omit<Plan, '_id' | 'userId' | 'status' | 'startDate' | 'endDate'>; 
  isLoading: boolean;
  planType: 'Health' | 'Finance' | 'Lifestyle';
}

export function FinancialPlanWidget({ plan, dummyPlan, isLoading, planType }: ReusablePlanWidgetProps) {
  const displayPlan = plan || dummyPlan;

  if (isLoading) {
    return (
      <Card className="bg-black/30 border border-blue-900 shadow-xl backdrop-blur-md">
        <CardHeader>
          <Skeleton className="h-6 w-3/4 bg-blue-900/30" />
          <Skeleton className="h-4 w-1/2 bg-blue-900/20" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-10 w-full bg-blue-900/20" />
          <Skeleton className="h-10 w-full bg-blue-900/20" />
          <Skeleton className="h-10 w-full bg-blue-900/20" />
        </CardContent>
      </Card>
    );
  }

  const getStatusIcon = (status: 'on-track' | 'at-risk' | 'completed') => {
    if (status === 'completed') return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    if (status === 'at-risk') return <AlertCircle className="h-5 w-5 text-red-500" />;
    return <CircleDashed className="h-5 w-5 text-blue-500" />;
  };

  // Fallback UI if displayPlan is missing or incomplete
  if (!displayPlan || !displayPlan.planTitle || !displayPlan.monthlyGoals) {
    return (
      <Card className="bg-black/30 border border-blue-900 shadow-xl backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-white">No Plan Available</CardTitle>
          <CardDescription className="text-cyan-300">We couldn't find a financial plan to display.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" className="mt-4 w-full border-cyan-400 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-bold hover:bg-cyan-700/80 hover:text-white transition">Create a New Plan</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full bg-black/30 border border-blue-900 shadow-xl backdrop-blur-md">
      <CardHeader>
        <CardTitle className="text-white drop-shadow-lg">{displayPlan.planTitle}</CardTitle>
        <CardDescription className="text-cyan-300">Your personalized roadmap to achieve your financial goals.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {displayPlan.monthlyGoals.map((goal, i) => (
            <li key={i} className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                {goal.status === 'completed' && <CheckCircle2 className="h-5 w-5 text-green-400" />}
                {goal.status === 'at-risk' && <AlertCircle className="h-5 w-5 text-red-400" />}
                {goal.status === 'on-track' && <CircleDashed className="h-5 w-5 text-blue-400" />}
              </div>
              <div>
                <div className="font-semibold text-white text-base mb-1">Month {goal.month}: <span className="text-cyan-300">{goal.description}</span></div>
                <div className="text-sm text-cyan-400 leading-relaxed">Target: {goal.target}</div>
              </div>
            </li>
          ))}
        </ul>
       
        {!plan && (
            <Button variant="outline" className="mt-4 w-full border-cyan-400 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-bold hover:bg-cyan-700/80 hover:text-white transition">Create a New Plan</Button>
        )}
      </CardContent>
    </Card>
  );
}
// // web_app/components/finance/FinancialPlanWidget.tsx
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { CheckCircle2, CircleDashed, AlertCircle } from "lucide-react";
// import { Plan } from "@/models/plan"; // Import the full Plan model
// // import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton for loading state
// // TODO: Update the import path below if Skeleton is located elsewhere
// import { Skeleton } from "../ui/skeleton"; // Adjust the path as needed

// interface ReusablePlanWidgetProps {
//   plan: Plan | null;
//   dummyPlan: Omit<Plan, '_id' | 'userId' | 'status' | 'startDate' | 'endDate'>; // Dummy plan for display
//   isLoading: boolean;
//   planType: 'Health' | 'Finance' | 'Lifestyle';
// }

// export function FinancialPlanWidget({ plan, dummyPlan, isLoading, planType }: ReusablePlanWidgetProps) {
//   const displayPlan = plan || dummyPlan;

//   // --- Show a loading skeleton while fetching data ---
//   if (isLoading) {
//     return (
//       <Card>
//         <CardHeader>
//           <Skeleton className="h-6 w-3/4" />
//           <Skeleton className="h-4 w-1/2" />
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <Skeleton className="h-10 w-full" />
//           <Skeleton className="h-10 w-full" />
//           <Skeleton className="h-10 w-full" />
//         </CardContent>
//       </Card>
//     );
//   }

//   const getStatusIcon = (status: 'on-track' | 'at-risk' | 'completed') => {
//     if (status === 'completed') return <CheckCircle2 className="h-5 w-5 text-green-500" />;
//     if (status === 'at-risk') return <AlertCircle className="h-5 w-5 text-red-500" />;
//     return <CircleDashed className="h-5 w-5 text-blue-500" />;
//   };

//   return (
//     <Card className="w-full">
//       <CardHeader>
//         <CardTitle>{currentPlan.planTitle}</CardTitle>
//         <CardDescription>Your personalized roadmap to achieve your financial goals.</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <ul className="space-y-4">
//           {currentPlan.monthlyGoals.map((goal, i) => (
//             <li key={i} className="flex items-center space-x-4">
//               <div className="flex-shrink-0">{getStatusIcon(goal.status as any)}</div>
//               <div>
//                 <div className="font-semibold text-white text-base mb-1">Month {goal.month}: {goal.description}</div>
//                 <div className="text-sm text-cyan-300 leading-relaxed">Target: {goal.target}</div>
//               </div>
//             </li>
//           ))}
//         </ul>
//         {/* Only show the "Create Plan" button if no real plan exists */}
//         {!plan && (
//             <Button variant="outline" className="mt-4 w-full">Create a New Plan</Button>
//         )}
//       </CardContent>
//     </Card>
//   );
// }