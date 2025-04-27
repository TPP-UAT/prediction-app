/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArticleTitle, Column, KeywordList, KeywordRow, RecommendationCard, Row, Title } from "./styles";
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';

interface RecommendationListProps {
    recommendations: any;
    title: string;
}

const RecommendationList = (props: RecommendationListProps) => {
    const { recommendations, title } = props;

    return (
        <Column>
            <Title>{title}</Title>
            {recommendations.map((recommendation: any, _index: number) => (
                <RecommendationCard key={recommendation.id}>
                <ArticleTitle href={recommendation.link} target="_blank">{recommendation.title}</ArticleTitle>

                <KeywordRow>
                    <SubdirectoryArrowRightIcon style={{ color: "gray", height: "18px", marginRight: 4 }} />
                    <b>Mismos términos:</b>
                    <KeywordList title={recommendation.same_keywords?.join(", ")}>
                        {recommendation.same_keywords?.join(", ") || '–'}
                    </KeywordList>
                </KeywordRow>

                <KeywordRow>
                    <SubdirectoryArrowRightIcon style={{ color: "gray", height: "18px", marginRight: 4 }} />
                    <b>Otros términos:</b>
                    <KeywordList title={recommendation.other_keywords?.join(", ")}>
                        {recommendation.other_keywords?.join(", ") || '–'}
                    </KeywordList>
                </KeywordRow>
                </RecommendationCard>
            ))}


        </Column>
    );
}

export default RecommendationList;
